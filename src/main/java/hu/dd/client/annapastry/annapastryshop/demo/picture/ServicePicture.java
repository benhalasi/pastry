package hu.dd.client.annapastry.annapastryshop.demo.picture;

import java.nio.file.Path;

import org.springframework.stereotype.Service;

@Service
public class ServicePicture {

  private final Path about = Path.of("/_/about/");
  private final Path main = Path.of("/_/main/");
  private final Path product = Path.of("/_/product/");

  public Picture main () {
    return new Picture(main, "main.jpg")
    .setTitle("Cukrászda")
    .setAlt("Cukrászda bemutató kép.");
  }

  public Picture mainThumbnail () {
    return new Picture(main, "main.thumbnail.jpg")
    .setTitle("Cukrászda")
    .setAlt("Cukrászda bemutató kép.");
  }
  
  public Picture about (int n) {
    return new Picture(about, "about-" + n + ".jpg");
  }
  
  public Picture product (int n) {
    return new Picture(product, "prod-" + n + ".jpg")
    .setTitle("Termék kép - " + n)
    .setAlt("Cukrászda bemutató kép.");
  }
  
}
