{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
<div>
{#<div class="navbar-offset">#}
    <div style=" background: #336699" >
        <div class="container">
            <div class="row" style="height: 360px;display: flex; align-items: center">
                <div class="col-md-12" >
                    <div class="wrap">
                        <h1 style="color: #FFFFFF;">{{ data.profile.name }}</h1>
                        <div style="color: #FFFFFF">{{ data.profile.profile }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12" >
                <div>
                    Social Media
                </div>
                <div>
                    <a href="{{ data.social_media.facebook }}">
                        <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
                    </a>
                </div>
                <div>
                    <a href="{{ data.social_media.twitter }}">
                        <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}