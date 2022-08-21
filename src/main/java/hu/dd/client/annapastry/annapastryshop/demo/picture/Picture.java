package hu.dd.client.annapastry.annapastryshop.demo.picture;

import java.nio.file.Path;

public class Picture {
  private final Path src;

  private String title;
  private String alt;

  public Picture(Path base, String name) {
    src = Path.of(base.toString(), name);
  }
  public String getTitle() {
    return title;
  }

  public Picture setTitle(String title) {
    this.title = title;
    return this;
  }

  public String getAlt() {
    return alt;
  }

  public Picture setAlt(String alt) {
    this.alt = alt;
    return this;
  }

  public Path getSrc() {
    return src;
  }
}
