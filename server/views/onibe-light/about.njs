{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    {% include "block/story.njs" %}
    <div class="container">
        {% include "block/template.njs" %}

    </div>
{% endblock %}