{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <div class="cover-image" style="background-image: url('/onibe-light/images/profile-pics/megabanner.png')">
        <div class="container">

        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>{{ data.post.title }}</h2>
                <div class="post-html">{{ data.post.html | safe }}</div>

                {% if data.post.tags.length > 0 %}
                    <div class="post-tags-label">Tags: </div>
                    <div class="role-list">
                        {% for tag in data.post.tags %}
                            <span class="label label-hex label-default">{{ tag.name }}</span>
                        {%  endfor %}
                    </div>
                {% endif %}
            </div>
        </div>
    </div>
{% endblock %}