<?php

use Illuminate\Support\Facades\Route;
use Laravel\Nova\Http\Requests\NovaRequest;

/*
|--------------------------------------------------------------------------
| Tool Routes
|--------------------------------------------------------------------------
|
| Here is where you may register Inertia routes for your tool. These are
| loaded by the ServiceProvider of the tool. The routes are protected
| by your tool's "Authorize" middleware by default. Now - go build!
|
*/


Route::get('/', function (NovaRequest $request) {
    return inertia('LanguageIndex', ['novaPath' => '/'.trim(config('nova.path'), '/')]);
});

Route::get('languages/create', function (NovaRequest $request) {
    return inertia('LanguageCreate', ['novaPath' => '/'.trim(config('nova.path'), '/')]);
});

Route::get('languages/translations', function (NovaRequest $request) {
    return inertia('TranslationIndex', ['novaPath' => '/'.trim(config('nova.path'), '/')]);
});

Route::get('languages/translations/{language}/create', function (NovaRequest $request, $language) {
    return inertia('TranslationCreate', ['novaPath' => '/'.trim(config('nova.path'), '/'), 'language' => $language]);
});