<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Fine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $totalLendings = Lending::count();
        $activeLendings = Lending::where('status', 'borrowed')->count();
        
        $totalFines = Fine::sum('amount');
        $unpaidFines = Fine::where('paid', false)->sum('amount');

        $overdueLendings = Lending::with(['user', 'book'])
            ->where('status', 'borrowed')
            ->where('due_date', '<', now())
            ->get();

        return Inertia::render('Reports/Index', [
            'stats' => [
                'total_lendings' => $totalLendings,
                'active_lendings' => $activeLendings,
                'total_fines' => $totalFines,
                'unpaid_fines' => $unpaidFines,
            ],
            'overdue_lendings' => $overdueLendings,
        ]);
    }
}
