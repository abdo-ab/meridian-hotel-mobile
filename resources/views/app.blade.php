<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <native:top-bar title="Genet Hotel" show-navigation-icon="true" />

        <native:side-nav>
            <native:side-nav-header title="About Developer" subtitle="Abdo" icon="person" />
            <native:side-nav-item id="dev-site" label="Official Site" icon="public" url="https://abdoab.dev" />
            <native:side-nav-item id="dev-contact" label="Contact: 0937848785" icon="contacts" url="tel:0937848785" />
            <native:side-nav-item id="dev-email" label="Email: hireab11@gmail.com" icon="mail" url="mailto:hireab11@gmail.com" />
        </native:side-nav>

        <native:bottom-nav label-visibility="labeled">
            <native:bottom-nav-item id="home" icon="home" label="Home" url="/" :active="request()->is('/')" />
            <native:bottom-nav-item id="rooms" icon="hotel" label="Rooms" url="/rooms" :active="request()->is('rooms*')" />
            <native:bottom-nav-item id="about" icon="info" label="About" url="/about" :active="request()->is('about*')" />
            <native:bottom-nav-item id="contactus" icon="phone" label="Contact Us" url="/contactus" :active="request()->is('contactus*')" />
        </native:bottom-nav>

        <x-inertia::app />
    </body>
</html>
