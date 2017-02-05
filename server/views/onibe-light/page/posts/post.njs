{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <div class="" style="background: #000;">
        <div class="container" style="height: 300px; ">

        </div>
    </div>

    <div class="container">
        <div class="col-md-8 col-md-push-2">
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
{% endblock %}