# Patronus SPA

**Daniel Walker**

**David Khourshid**

A sample SPA (single page app) for WordCamp Orlando 2015. This is a demonstration of how to put a SPA into a wordpress theme. We use the plugin called [JSON-API](https://wordpress.org/plugins/json-api/) and [ACF](https://wordpress.org/plugins/advanced-custom-fields/) for the actual Patronus specific fields.


###Getting Started

clone the project then:

    npm install
    homepress start

After that, to turn the VM on or off use:

    vagrant up
    vagrant halt


###WordPress Setup.

Activate the `json-api` and `acf` plugins.

You'll need to import the ACF (advanced custom fields) found in `dev/advanced-custom-fields-export.xml`

Then go create some patronuses.

Hitting: GET `http://homepress.app/api/get_posts/?post_type=patronus` will list the patronuses.

To show one, do: `http://homepress.app/api/get_posts/?post_type=patronus&post_id=<ID>`
