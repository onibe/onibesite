{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}

<div class="team-member-wrapper" >
    <div class="team-member-cover container">

    </div>
</div>

<section class="team-member">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1 class="text-center">Meet the team</h1>
            </div>
        </div>
        <div class="row voffset2">
            {% for item in data.team %}
                <div class="col-sm-6 col-md-3">
                    {% if item.picture %}
                        <a href="/team/{{ item.username }}">
                            <div class="team-member-image-container image-hex" style="background-image: url({{ item.picture }})"  href="/team/{{ item.username }}"></div>
                        </a>
                    {% else %}
                        <a href="/team/{{ item.username }}">
                            <div class="team-member-image-container image-hex" style="background-image: url('/onibe-light/images/profile-pics/spaghetti.png')"  href="/team/{{ item.username }}"></div>
                        </a>
                    {% endif %}
                    {% if item.role.length > 0 %}
                        <div class="team-member-roles">
                            {% for role in item.role %}
                                <span class="label label-hex label-{{ role | lower }}">{{ role }}</span>
                            {%  endfor %}
                        </div>
                    {% endif %}
                    <a class="team-member-image-link" href="/team/{{ item.username }}">
                        <h4 class="team-member-name">{{ item.name }}</h4>
                    </a>
                    <p class="team-member-profile">{{ item.profile | safe }}</p>
                </div>
                {% if loop.index % 4 == 0 %}
                    <div class="voffset4 rvoffset4 clearfix visible-md-block visible-lg-block"></div>
                {% endif %}
                {% if loop.index % 2 == 0 %}
                    <div class="voffset4 rvoffset4 clearfix visible-sm-block visible-sm-block"></div>
                {% endif %}
            {% endfor %}
        </div>
    </div>
</section>

{% endblock %}