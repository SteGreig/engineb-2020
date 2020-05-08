<?php

add_action( 'admin_head', 'br_custom_acf' );

function br_custom_acf() {
	echo '<style>
		.acf-flexible-content .layout:nth-child(odd) { background: rgba(229,0,90,.3);}
		.acf-row:nth-child(even) .acf-fields { background: rgba(229,0,90,.3);}
		.acf-row:nth-child(odd) .acf-fields>.acf-tab-wrap { background: rgba(229,0,90,.3); }
		.acf-flexible-content .layout:nth-child(odd) .acf-field .acf-label p {color: black;}
		.acf-label { background: #ffffff; padding: 10px;margin-bottom:0;}
		.acf-fields>.acf-field {border-top:none;}
		.acf-fields>.acf-tab-wrap {background: none; }
		.acf-input p, ul.acf-radio-list { background: #ffffff; padding: 10px; }
	</style>';
}

add_post_type_support( 'page', 'excerpt' );

