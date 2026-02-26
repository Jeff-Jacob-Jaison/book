<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function showLandingPage()
    {
        return Inertia::render('landing');
    }

    public function showAboutPage()
    {
        return Inertia::render('About');
    }

    public function showCollectionPage()
    {
        return Inertia::render('Collection');
    }
}
