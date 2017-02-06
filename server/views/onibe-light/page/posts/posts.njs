{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <div class="cover-image" style="background-color: #000;
        height: 300px;
        background-image: url('/onibe-light/images/profile-pics/megabanner.png')">
        <div class="container">

        </div>
    </div>

    <div class="container">

        <div class="row">
            <div class="col-md-8">
                <h3>Posts</h3>
                <div>{{ data.total }} Results</div>
                <hr />
                {% for post in data.data %}
                    <a href="{{ post.link }}">
                        <h3>{{ post.title }}</h3>
                    </a>
                    <div class="body">{{ post.html | safe }}</div>
                    <div class="tags">
                    </div>
                {% endfor %}
            </div>

            {#<div class="col-md-4">#}
                {#<h3>Tags</h3>#}
                {#<div class="well">#}

                {#</div>#}
            {#</div>#}
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