{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
<div class="profile">
    <div class="profile-header" style="background-image: url({{ data.profile.cover_picture }})">
        <div class="container">
            {% if data.profile.picture %}
                <div class="profile-header-image image-hex" style="background-image: url({{ data.profile.picture }})">
                </div>
            {% else %}
                <div class="profile-header-image image-hex" style="background-image: url('/onibe-light/images/profile-pics/spaghetti.png')">
                </div>
            {% endif %}

            {% if data.profile.role.length > 0 %}
            <div class="profile-header-roles">
                {% for role in data.profile.role %}
                    <span class="label label-hex label-{{ role | lower }}">{{ role }}</span>
                {%  endfor %}
            </div>
            {% endif %}
        </div>

    </div>
    <div class="container">
        <div class="profile-short">
            <h1 class="profile-short-name">{{ data.profile.name }}</h1>
            <div class="profile-short-info hidden-xs" >{{ data.profile.profile | safe }}</div>
        </div>
        <div class="profile-short-info-mobile visible-xs" >{{ data.profile.profile | safe }}</div>
    </div>
    <div class="profile-body">
        <div class="container">
            <div class="profile-body-region-top">
                <div class="profile-body-left" >
                    {% set socialLength = (data.profile.social_media | getLengthOfObjectWithValues) %}
                    {% if socialLength > 0 %}
                        <h4>Social Media</h4>
                    {% endif %}
                    {% for key, value in data.profile.social_media %}
                        {% if value %}
                            <div class="social-media social-media-{{ key }}">
                                {% if key == 'facebook' %}
                                    <a href="{{ value }}">
                                        <i class="fa fa-facebook" aria-hidden="true"></i> {{ key }}
                                    </a>
                                {% elseif key == 'twitter' %}
                                    <a href="{{ value }}">
                                        <i class="fa fa-twitter" aria-hidden="true"></i> {{ key }}
                                    </a>
                                {% endif %}
                            </div>
                        {% endif %}
                    {% endfor %}
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
                            <h4>What Does Onibe mean?</h4>
                            <blockquote>{{ data.profile.what_onibe_means }}</blockquote>
                        {%  endif %}
                        {% if data.profile.translations.length > 0 %}
                            <h4>Translations</h4>
                            <div>
                                {% set comma = joiner() -%}
                                {% for translations in data.profile.translations -%}
                                    {{ comma() }} {{ translations }}
                                {%- endfor %}
                            </div>
                        {% endif %}
                        {% if data.profile.charm_point  %}
                            <h4>Charm Point</h4>
                            <div>{{ data.profile.charm_point }}</div>
                        {%  endif %}
                        {% if data.profile.hobbies %}
                            <h4>Hobbies</h4>
                            <div>{{ data.profile.hobbies }}</div>
                        {%  endif %}
                        {% if data.profile.country  %}
                            <h4>Country</h4>
                            <div>{{ data.profile.country }}</div>
                        {% endif %}
                        {% if data.profile.best_girls.length > 0 %}
                            <h4>Best Girls</h4>
                            <div>
                                {% set comma = joiner() %}
                                {% for girl in data.profile.best_girls -%}
                                    {{ comma() }} {{ girl }}
                                {%- endfor %}
                            </div>
                        {% endif %}
                        {% if data.profile.best_seiyuu.length > 0 %}
                            <h4>Best Seiyuu</h4>
                            <div>
                                {% set comma = joiner() %}
                                {% for girl in data.profile.best_seiyuu -%}
                                    {{ comma() }} {{ girl }}
                                {%- endfor %}
                            </div>
                        {% endif %}
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
{% endblock %}