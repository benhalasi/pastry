package hu.dd.client.annapastry.annapastryshop.demo;

import hu.dd.client.annapastry.annapastryshop.util.thyme.ThymeHtml;
import hu.dd.client.annapastry.annapastryshop.util.thyme.ThymePage;

public final class Pages {

  public final static ThymePage error = ThymeHtml.page("/page-error.html");
  public final static ThymePage main = ThymeHtml.page("/demo/page-main.html");
  public final static ThymePage product = ThymeHtml.page("/demo/page-product.html");
  public final static ThymePage about = ThymeHtml.page("/demo/page-about.html");
  
}
