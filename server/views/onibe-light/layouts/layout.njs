<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="/">
        <link rel="stylesheet" href="/dist/onibe-light/styles/main.css"  />
        <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800" rel="stylesheet">
        <title>{{testVar}}</title>
    </head>
    <body>

        {% include "block/navbar.njs" %}

        {% block content %}
        {% endblock %}

        {% include "block/footer.njs" %}

        <!-- Scripts -->
        <script src="/dist/onibe-light/js/homepage.js"></script>
    </body>
</html>