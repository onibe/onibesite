{% extends "layouts/layout.njs" %}

{% set data = data %}

{% block content %}
    <section class="about">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <img src="http://vignette2.wikia.nocookie.net/love-live/images/0/03/Seiyuu_Character_Profile_-_Saitou_Shuka.jpg/revision/latest/scale-to-width-down/200?cb=20160707031641" />
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="section-title">
                        {#<h2>More Information coming later</h2>#}
                        <div>
                            <p>
                                With roots in the reddit Love Live community,
                                Team ONIBE was formed by a group of Love Live content translators in the second half of 2016 as a collaborative
                                to produce top-quality content for Love Live's international audience.
                            </p>
                            <p>
                                Having started with text-based interviews and subtitled niconama excerpts,
                                Team ONIBE has since expanded and diversified its scope to encompass manga translations and typesetting and radio broadcast translations,
                                while maintaining a standardised QC process.
                                Team ONIBE plans to set its sights on being the premier Love Live content provider for the international, English-speaking community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        {#{% include "block/template.njs" %}#}
    </div>
{% endblock %}