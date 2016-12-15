{% extends "layouts/layout.njs" %}

{% block content %}

<div class="homepage-window">
    <div class="container">
        <div class="row">
            <div class="col-md-12 homepage-window-inner">
                <div class="font-family-secondary holder">
                    <article>
                       <h1>Header</h1>
                       <p>Slogan Here</p>
                       <a class="btn btn-primary" href="/services" role="button">🍝</a>
                    </article>  
                </div>
            </div>
        </div>
    </div>
</div>

<div class="homepage-feature text-center">
    <div class="container">
        <div class="homepage-feature-header row">
            <h2>Some Text</h2>
        </div>
        <div class="homepage-feature-body row">
            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>
            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>

            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>
        </div>
       <div class="homepage-feature-body row">
            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>

            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>

            <a href="/services">
            <div class="col-md-4">
                <div class="img-circle homepage-circle-bg"></div>
                <div class="homepage-circle-description">
                    🍝
                </div>
            </div>
            </a>
        </div>
    </div>
</div>


{% endblock %}