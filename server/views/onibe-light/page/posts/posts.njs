{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <div class="" style="background: #000;">
        <div class="container" style="height: 300px; ">

        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                {% for post in data.data %}
                    <a href="{{ post.link }}">
                        <h2>{{ post.title }}</h2>
                    </a>
                    <div class="body">{{ post.html }}</div>
                    <div class="tags">
                    </div>
                {% endfor %}
            </div>

            <div class="col-md-4">
                <div class="well">
                    Nice
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="pagination">

                    {% if data.previous %}
                        <a href="{{ data.previous }}">Previous</a>
                    {% endif %}


                    {% if data.next %}
                        <a href="{{ data.next }}">Next</a>
                    {% endif %}

                </div>
            </div>
        </div>
   </div>


{% endblock %}