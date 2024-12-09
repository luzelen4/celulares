<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>E Shirt</title>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    @vite([
        'resources/css/bootstrap.min.css',
        'resources/css/tiny-slider.css',
        'resources/css/style.css'
    ])
</head>
<body>
    @yield('content')

    @vite([
        'resources/js/bootstrap.bundle.min.js',
        'resources/js/tiny-slider.js',
        'resources/js/custom.js'
    ])
    <style>@media all and (min-width:1px){.tns-mq-test{position:absolute}}</style>
</body>
</html>