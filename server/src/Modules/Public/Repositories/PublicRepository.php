<?php
namespace Haseri\Backend\Modules\Public\Repositories;

use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\JobCategory;
use Haseri\Backend\Shared\Models\Review;
use Haseri\Backend\Shared\Models\TechnicianSkill;
use Haseri\Backend\Shared\Models\User;

class PublicRepository
{
    public function getTopTechnicians()
    {
        return $this->baseTechniciansQuery()
            ->orderByRaw('(SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE reviewed_user_id = users.id) DESC')
            ->get()
            ->map(function ($tech) {
                return $this->mapTechnician($tech, true);
            });
    }

    public function getTechnicians($skill = null)
    {
        $query = $this->baseTechniciansQuery();

        if ($skill) {
            $normalized = $this->normalizeSkill($skill);
            if ($normalized !== '') {
                $query->whereHas('skills', function ($q) use ($normalized) {
                    $q->whereRaw('LOWER(skill_name) = ?', [strtolower($normalized)]);
                });
            }
        }

        return $query->get()->map(function ($tech) {
            return $this->mapTechnician($tech, false);
        });
    }

    public function getRecentJobs()
    {
        return $this->jobsQuery()
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($job) {
                return $this->mapJob($job);
            });
    }

    public function getHighPriceJobs()
    {
        return $this->jobsQuery()
            ->orderBy('price', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($job) {
                return $this->mapJob($job);
            });
    }

    public function getStats()
    {
        return [
            'technicians' => User::where('role', 'provider')->where('is_active', true)->count(),
            'jobs_posted' => Job::count(),
            'jobs_completed' => Job::where('status', 'completed')->count(),
            'reviews' => Review::count(),
        ];
    }

    public function getSearchSuggestions($query)
    {
        if (strlen($query) < 2) {
            return ['categories' => [], 'jobs' => [], 'technicians' => []];
        }

        $query = strtolower($query);

        $categories = JobCategory::whereRaw('LOWER(name) LIKE ?', ["%{$query}%"])
            ->limit(5)
            ->get(['id', 'name']);

        $jobs = Job::where('status', 'open')
            ->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->limit(5)
            ->get(['id', 'title']);

        $technicians = User::where('role', 'provider')
            ->where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->whereRaw('LOWER(first_name) LIKE ?', ["%{$query}%"])
                    ->orWhereRaw('LOWER(last_name) LIKE ?', ["%{$query}%"]);
            })
            ->limit(5)
            ->get(['id', 'first_name', 'last_name']);

        return [
            'categories' => $categories,
            'jobs' => $jobs,
            'technicians' => $technicians,
        ];
    }

    public function getPublicSkills()
    {
        $rows = TechnicianSkill::whereHas('user', function ($q) {
            $q->where('role', 'provider')->where('is_active', true);
        })->get(['skill_name']);

        return $this->uniqueSkills(
            $rows->map(function ($row) {
                return $row->skill_name;
            })->all()
        );
    }

    private function jobsQuery()
    {
        return Job::with(['category', 'address'])->where('status', 'open');
    }

    private function mapJob($job)
    {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'price' => $job->price,
            'category' => $job->category ? $job->category->name : null,
            'city' => $job->address ? $job->address->city : null,
            'specific_location' => $job->address ? $job->address->specific_location : null,
            'created_at' => $job->created_at->toIso8601String(),
        ];
    }

    private function baseTechniciansQuery()
    {
        return User::where('role', 'provider')
            ->where('is_active', true)
            ->with(['skills', 'address', 'technicianVerification']);
    }

    private function mapTechnician($tech, $limitSkills)
    {
        $skillsList = $this->uniqueSkills($tech->skills->pluck('skill_name')->all());
        if ($limitSkills) {
            $skillsList = array_slice($skillsList, 0, 2);
        }

        return [
            'id' => $tech->id,
            'name' => $tech->first_name . ' ' . $tech->last_name,
            'avatar' => $tech->avatar,
            'rating' => $tech->average_rating,
            'total_reviews' => $tech->review_count,
            'city' => $tech->address ? $tech->address->city : null,
            'specific_location' => $tech->address ? $tech->address->specific_location : null,
            'skills' => $skillsList,
            'verified' => $tech->technicianVerification && $tech->technicianVerification->status === 'approved',
        ];
    }

    private function normalizeSkill($value)
    {
        $value = trim((string) $value);
        if ($value === '') {
            return '';
        }

        $value = preg_replace('/[^a-zA-Z0-9\s]+/', ' ', $value);
        $value = trim(preg_replace('/\s+/', ' ', $value));
        $value = strtolower($value);

        $value = $this->canonicalizeSkill($value);

        return $this->formatSkillLabel($value);
    }

    private function uniqueSkills(array $skills)
    {
        $unique = [];

        foreach ($skills as $skill) {
            $name = $this->normalizeSkill($skill);
            if ($name === '') {
                continue;
            }
            $key = strtolower($name);
            if (!isset($unique[$key])) {
                $unique[$key] = $name;
            }
        }

        $skills = array_values($unique);
        sort($skills, SORT_NATURAL | SORT_FLAG_CASE);

        return $skills;
    }

    private function canonicalizeSkill($value)
    {
        if ($value === '') {
            return '';
        }

        if (preg_match('/\binstal+er\b|\binstaler\b|\binstaller\b/', $value)) {
            return 'installer';
        }

        return $value;
    }

    private function formatSkillLabel($value)
    {
        if ($value === '') {
            return '';
        }

        return ucwords($value);
    }
}
