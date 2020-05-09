<?php

	$gdpr = get_field( 'gdpr', 'option' );
	$gdprHeader = $gdpr['header'];
	$gdprAcceptText = $gdpr['accept_cta'];
	$gdprDeclinetext = $gdpr['decline_cta'];
	$gdprContent = $gdpr['intro_copy'];

?>
<article class="section section--gdpr">
		
	<section class="section--gdpr-outer">
	
		<div class="section--gdpr-inner">

		<img src="https://via.placeholder.com/250x60?text=Company+Logo">
				
			<?php if( $gdprHeader ): ?>
			<h1 class="gdpr__header"><?php echo $gdprHeader; ?></h1>
			<?php endif;?>

			<?php if( $gdprContent ): echo $gdprContent; endif;?>

			<?php if( $gdprAcceptText ): ?>
			<button class="btn btn--accept gtm--accept" type="button" aria-label="Accept cookie Ploicy, close dialog" title="Accept and close">&#10003; <?php echo $gdprAcceptText; ?></button>
			<?php endif;?>

			<?php if( $gdprDeclinetext ): ?>
			<button class="btn btn--decline gtm--decline" type="button" aria-label="Decline cookie Ploicy, close dialog" title="Decline and close">&#10005; <?php echo $gdprDeclinetext; ?></button>
			<?php endif;?>

		</div>

	</section>

</article>