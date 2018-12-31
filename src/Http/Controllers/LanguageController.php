<?php

namespace Joedixon\NovaTranslation\Http\Controllers;

use App\Http\Controllers\Controller;
use JoeDixon\Translation\Drivers\Translation;
use JoeDixon\Translation\Http\Requests\LanguageRequest;

class LanguageController extends Controller
{
    private $translation;

    public function __construct(Translation $translation)
    {
        $this->translation = $translation;
    }

    public function index()
    {
        return response()->json($this->translation->allLanguages());
    }

    public function store(LanguageRequest $request)
    {
        $this->translation->addLanguage($request->locale, $request->name);

        return response()->json(['success' => true]);
    }
}
