{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
<div class="homepage-window-wrapper">
    <div class="homepage-window container">
        <div style="flex-grow: 1;"></div>
        {#<img src="/onibe-light/images/onibe-logo.png" />#}

        <div class="homepage-window-inner">
            {#<span style="align-self: flex-end; color: #949599; text-shadow: 1px 1px #FFF; font-size: 46px; font-family: 'Dosis'; font-weight: 700">Translation Group</span>#}
            <div class="holder">
                <article>
                    <h1>{{ data.header }}</h1>
                    <p>{{ data.slogan }}</p>
                </article>
            </div>
        </div>
        <div class="homepage-window-button-container">
            <div class="homepage-scroll-down-button">
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
        </div>
    </div>

</div>
    <div class="icon icon--simple target"></div>

<div class="homepage-feature bg-check-source">
    <div class="container">
        <div class="row">
            <div class="col-md-4">

            </div>
            <div class="col-md-8" style="text-align: left">
                <div class="homepage-about" >
                    <h1>We are Team ONIBE</h1>
                    <p>
                        A new group aimed at translating Love Live related content to English for the community! We're comprised of various members from the Love Live community (wikia, tumblr, youtube, reddit, twitter)
                    </p>
                    <div><a class="btn btn-primary" href="/team">Meet the team</a></div>
                </div>

            </div>
        </div>

    </div>
</div>

<div class="homepage-social-media" style="padding: 100px 0;">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="social-media-container">
                    <h4>Contact Us</h4>
                    <div>
                        <a href="mailto:contact@onibe.moe" target="_top">
                            contact&#64;onibe&#46;moe
                        </a>
                    </div>
                </div>
                <div class="social-media-container">
                    <h4>Twiiter</h4>
                    <div>
                        <i class="fa fa-twitter"></i>
                        <a href="https://twitter.com/teamonibe">@teamonibe</a>
                    </div>
                </div>
                <div class="social-media-container">
                    <h4>Facebook</h4>
                    <div>
                        <i class="fa fa-facebook"></i>
                        <a href="https://facebook.com/teamonibe">/teamonibe</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 hidden-xs">
                <div class="twitter-container">
                    <h4>Twitter Feed</h4>
                    <a class="twitter-timeline" data-height="500" href="https://twitter.com/teamonibe">Tweets by TwitterDev</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
                </div>
            </div>
            <div class="col-md-4 hidden-xs">
                <div class="facebook-container">
                    <h4>Facebook Feed</h4>
                    <div class="fb-page" data-href="https://www.facebook.com/teamonibe" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/teamonibe" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/teamonibe">ONIBE Translations</a></blockquote></div>                </div>
            </div>

        </div>
    </div>
</div>

{% endblock %}