<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="/">
        <link rel="stylesheet" href="/dist/onibe-light/styles/main.css"  />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
        <link href="//fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800" rel="stylesheet">
        <link href="//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i" rel="stylesheet">
        <meta name="description" content="{{ data.meta.description }}">
        <meta name="keywords" content="{{ data.meta.keywords }}">
        <meta property="og:title" content="{{ data.meta.facebook.title }}"/>
        <meta property="og:site_name" content="{{ data.meta.facebook.site_name }}"/>
        <meta property="og:type" content="{{ data.meta.facebook.type }}"/>

        <title>{{data.meta.title}}</title>
    </head>
    <body>
        {% include "block/navbar.njs" %}

        {% block content %}
        {% endblock %}

        {% include "block/footer.njs" %}

        <!-- Scripts -->
        <script src="/dist/onibe-light/js/homepage.js"></script>
        <div id="fb-root"></div>
        <script>(function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=242063639196012";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
    </body>
</html>