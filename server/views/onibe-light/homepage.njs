{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
<div class="homepage-window">
    <div class="container">
        <div class="row">
            <div class="col-md-12 homepage-window-inner">
                <div class="font-family-secondary holder">
                    <article>
                       <h1>{{ data.header }}</h1>
                       <p>{{ data.slogan }}</p>
                    </article>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="homepage-feature text-center">
    <div class="container">

        <div class="col-md-9">

        </div>
        <div class="col-md-3">
            <div class="twitter-container">
                <a class="twitter-timeline" href="https://twitter.com/teamonibe">Tweets by TwitterDev</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
        </div>
    </div>
</div>

{% endblock %}