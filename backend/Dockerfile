FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    libmcrypt-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libbz2-dev \
    libzip-dev \
    libonig-dev \
    locales \
    zip \
    unzip \
    git \
    curl

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer global require laravel/installer

ENV PATH="$PATH:/root/.composer/vendor/bin"

WORKDIR /var/www/html

COPY . /var/www/html

# RUN composer install
CMD bash -c "composer update && composer install && php artisan migrate:fresh && php artisan db:seed && artisan serve --host 0.0.0.0 --port 8000"
# CMD php artisan serve --host=0.0.0.0 --port=8000

EXPOSE 8000
