{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}

<div class="team-member-wrapper " >
    <div class="team-member-cover container">
        <div class="row">
            <div class="col-md-12">
                <div class="wrap">
                    <h1 style="color: #FFFFFF;  text-shadow: 2px 2px 0px rgba(100, 150, 200, 1);">Meet the team</h1>
                    <div style="color: #FFFFFF;  text-shadow: 2px 2px 0px rgba(100, 150, 200, 1);"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="team-member">
    <div class="container voffset">
        <div class="row">
            {% for item in data.team %}
                <div class="col-sm-6 col-md-3">
                    {% if item.picture %}
                        <a href="/team/{{ item.username }}">
                            <div class="team-member-image-container" style="background-image: url({{ item.picture }})"  href="/team/{{ item.username }}"></div>
                        </a>
                    {% else %}
                        <div class="team-member-image-container" style="background-image: url('/onibe-light/images/profile-pics/spaghetti.png')"  href="/team/{{ item.username }}">
                        </div>
                    {% endif %}
                    {% if item.role.length > 0 %}
                        <div class="team-member-roles">
                            <h5>
                            {% for role in item.role %}
                                <span class="label label-{{ role | lower }}">{{ role }}</span>
                            {%  endfor %}
                            </h5>
                        </div>
                    {% endif %}
                    <a class="team-member-image-link" href="/team/{{ item.username }}">
                        <h4 class="team-member-name">{{ item.username }}</h4>
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