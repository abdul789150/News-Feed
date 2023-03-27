<?php

namespace App\Providers;

use App\Services\UserService;
use App\Services\UserPreferencesService;
use App\Services\NewsService;
use App\Services\CategoryService;
use App\Services\SourceService;

use App\Interfaces\UserInterface;
use App\Interfaces\SourceInterface;
use App\Interfaces\CategoryInterface;
use App\Interfaces\UserPreferenceInterface;
use App\Interfaces\NewsSources\TheGaurdianInterface;
use App\Interfaces\NewsSources\NewYorkTimeInterface;
use App\Interfaces\NewsSources\NewsApiInterface;

use App\Repositories\UserRepository;
use App\Repositories\SourceRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\NewsSources\TheGaurdian;
use App\Repositories\NewsSources\NewYorkTimes;
use App\Repositories\NewsSources\NewsAPI;

use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(SourceInterface::class, SourceRepository::class);
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);        
        $this->app->bind(TheGaurdianInterface::class, TheGaurdian::class);
        $this->app->bind(NewYorkTimeInterface::class, NewYorkTimes::class);
        $this->app->bind(NewsApiInterface::class, NewsAPI::class);

        $this->app->singleton(UserService::class, function ($app) {
            return new UserService($app->make(UserInterface::class));
        });

        $this->app->bind(UserPreferencesService::class, function ($app) {
            return new UserPreferencesService($app->make(UserInterface::class));
        });

        $this->app->singleton(NewsService::class, function ($app) {
            return new NewsService($app->make(TheGaurdianInterface::class), $app->make(NewYorkTimeInterface::class), $app->make(NewsApiInterface::class));
        });

        $this->app->bind(CategoryService::class, function ($app) {
            return new CategoryService($app->make(CategoryInterface::class));
        });

        $this->app->bind(SourceService::class, function ($app) {
            return new SourceService($app->make(SourceInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
