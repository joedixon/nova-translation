<?php

namespace Joedixon\NovaTranslation\Http\Controllers;

use Illuminate\Routing\Controller;
use JoeDixon\Translation\Drivers\Translation;
use JoeDixon\Translation\Http\Requests\LanguageRequest;

class LanguageController extends Controller
{
    public function __construct(private readonly Translation $translation)
    {
    }

    public function index()
    {
        return response()->json($this->translation->allLanguages());
    }

    public function store(LanguageRequest $request)
    {
        $this->translation->addLanguage($request->getLocale(), $request->name);

        return response()->json(['success' => true]);
    }
}
