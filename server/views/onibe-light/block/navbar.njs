<header class="opacity">
    <div class="container">
        <nav class="navbar navbar-onibe navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#kfPages" aria-expanded="false">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand bg-check-target" href="/">{{ data.title }}</a>
                </div>
                <div class="collapse navbar-collapse" id="kfPages">
                    <ul class="nav navbar-nav navbar-right">
                        {% for name, link in data.nav %}
                            <li class="navbar-link"><a href="{{ link }}" class="bg-check-target">{{ name }}</a></li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</header>