{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <section class="about">
        <div class="about-cover">
            <div class="container">
                <p>
                    With roots in the reddit Love Live community,
                    Team ONIBE was formed by a group of Love Live content translators in the second half of 2016 as a collaborative
                    to produce top-quality content for Love Live's international audience.
                </p>
                <p>
                    Having started with text-based interviews and subtitled niconama excerpts,
                    the Team has since expanded and diversified its scope to encompass manga translations, typesetting and radio broadcast translations,
                    while maintaining a standardised QC process.
                    Team ONIBE plans to set its sights on being the premier Love Live content provider for the international, English-speaking community.
                </p>
            </div>
        </div>
    </section>

    <div class="container">
        {#{% include "block/template.njs" %}#}
    </div>
{% endblock %}