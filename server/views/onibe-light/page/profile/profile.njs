{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
<div class="profile">
    <div class="profile-header" style="background-image: url({{ data.profile.cover_picture }})">
        <div class="container">
            <div class="profile-header-image image-hex" style="background-image: url({{ data.profile.picture }})">
            </div>
            <div class="profile-header-roles">
                {% for role in data.profile.role %}
                    <span class="label label-hex label-{{ role | lower }}">{{ role }}</span>
                {%  endfor %}
            </div>
        </div>

    </div>
    <div class="container">
        <div class="profile-short-info">
            <h1>{{ data.profile.name }}</h1>
            <div >{{ data.profile.profile | safe }}</div>

        </div>
    </div>
    <div class="profile-body">
        <div class="container">
            <div class="profile-body-region-top">
                <div class="profile-body-left" >
                    <h4>Social Media</h4>
                    <div>
                        {% if data.profile.social_media.facebook %}
                            <a href="{{ data.profile.social_media.facebook }}">
                                <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
                            </a>
                        {% endif %}
                    </div>
                    <div>
                    {% if data.profile.social_media.twitter %}
                        <a href="{{ data.profile.social_media.twitter }}">
                            <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
                        </a>
                    {% endif %}
                    </div>
                    {% if data.profile.personal_website %}
                        <h4>Personal Website</h4>
                        <a class="wordwrap" href="{{ data.profile.personal_website }}">
                            {{ data.profile.personal_website | extractLocalAddress }}
                        </a>
                    {% endif %}
                </div>
                <div class="profile-body-right" >
                    <div class="profile-body-right-first">
                        {% if data.profile.what_onibe_means | safe %}
                        <h3>What Does Onibe mean?</h3>
                        <blockquote>{{ data.profile.what_onibe_means }}</blockquote>
                        {%  endif %}
                        {% if data.profile.hobbies  %}
                        <h3>Hobbies</h3>
                        <div>{{ data.profile.hobbies }}</div>
                        {%  endif %}
                        {% if data.profile.country  %}
                        <h3>Country</h3>
                        <div>{{ data.profile.country }}</div>
                        {% endif %}
                        {% if data.profile.best_girls.lenght > 0 %}
                        <h3>Best Girls</h3>
                        <div>
                            {% for girl in data.profile.best_girls %}
                                <span class="label label-hex label-{{ girl | lower }}">{{ girl }}</span>
                            {%  endfor %}
                        </div>
                        {% endif %}
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
{% endblock %}