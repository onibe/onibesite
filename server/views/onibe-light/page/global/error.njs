<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/">
    <link rel="stylesheet" href="/dist/onibe-light/styles/index.css"  />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="//fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Raleway:200,300,400,500,600,700,800" rel="stylesheet">

    <title>{{error.status}} - Error</title>
</head>
<body>
<h1 class="text-center voffset4">{{message}}</h1>
{% if error.status %}
<h2 class="text-center voffset4">{{error.status}}</h2>
{% endif %}
{% if error.stack %}
<pre>{{error.stack}}</pre>
{% endif %}
</body>
</html>