<template>
	<div class="container">
		<div class="f-container">
			<div class="grid__item">
				<header class="section-header">
					<h1 class="section-header__title">Become an Affiliate</h1>
				</header>
				<div class="rte rte--nomargin">
					<div class="table-wrapper">
						<table width="100%" border="1" bordercolor="#f0f1f3" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<td style="width: 49.9286%;">
                  &nbsp;<img src="~/static/images/becomeAnAffiliate/img.png">
									</td>
									<td style="width: 46.0714%;font-size: 16px;">
										<h2 class="section-titles" style="text-align: left;">PARTNERSHIPS</h2>
										<h2 class="section-subtitles">Let's collaborate!</h2>
										<div><meta charset="utf-8"></div>
										<p>
											<span>Frisson Life is a UK-based e-commerce platform. Frisson gathers together the very best in homeware, furniture, lighting, and featured home decor.</span>
										</p>
										<h2 class="section-subtitles">About our brand</h2>
										<div><meta charset="utf-8"></div>
										<p>
											<span>We name the brand Frisson because we want our products to bring our customers happiness and a sense of home. We also want our furniture to witness every pleasurable moment in your life and also bring you to brand new experiences. We hope that our furniture can bring you "frisson" through its aesthetic designs as well as its practical uses. With the home decor pieces at Frisson, you could think of your home as a work of art, and make it full of life, culture, and interesting items for all the world to see!&nbsp;</span>
										</p>
									</td>
								</tr>
								<tr>
									<td style="width: 49.9286%;font-size: 16px;">
										<h2 class="section-titles">AFFILIATES</h2>
										<h2 class="section-subtitles">Become an affiliate</h2>
										<p>
											We see our affiliates as a valuable part of the Frisson Life team and would love to have you on
											board. We offer continuous support, partnership opportunities and aim to have lots of fun along the
											way!
										</p>
										<h2 class="section-subtitles">Benefits to signing up</h2>
										<ul class="affiliate-benefits">
											<li>Free to join</li>
											<li>Earn up to 15% commission</li>
											<li>Fast payment</li>
											<li>Dedicated account manager</li>
											<li>In-house designed creatives</li>
										</ul>
										<p style="margin-top: 15px">
											<a href="https://ui.awin.com/merchant-profile/22530" title="Affiliate Program" class="rte__image">
												<img src="~/static/images/becomeAnAffiliate/img_2.png" alt="">
											</a>
										</p>
									</td>
									<td style="width: 46.0714%;">
										<img src="~/static/images/becomeAnAffiliate/img_1.png">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<f-footer />
	</div>
</template>

<script>
import fFooter from '@/components/footer/f-footer'

export default {
  name: 'BecomeAnAffiliate',
  components: {
    fFooter
  }
}
</script>

<style scoped lang="scss">
  .grid__item {
    width: 1000px;
    margin: 0 auto 100px;
  }

  .section-header {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
    }
  }

  .section-titles {
    font-size: 24px !important;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 20px;
  }

  .section-subtitles {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 20px;
  }

  td {
    padding: 30px;
  }

  ul {
    li {
      list-style: initial !important;
    }
  }

  .affiliate-benefits {
    margin-left: 10%;
  }
</style>
