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
                        <h1 style="color: #FFFFFF">{{ data.profile.name }}</h1>
                        <div style="color: #FFFFFF">{{ data.profile.profile }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}