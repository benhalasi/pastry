package hu.dd.client.annapastry.annapastryshop.demo.picture;

import java.nio.file.Path;

import org.apache.logging.log4j.util.Strings;

public class Picture {
  private final Path src;

  private String title;
  private String alt;

  private String w;
  private String h;
  private String aspectRatio;

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

  public String getW() {
    return w;
  }

  public Picture setW(int w) {
    this.w = Integer.toString(w);
    return this;
  }

  public String getH() {
    return h;
  }

  public Picture setH(int h) {
    this.h = Integer.toString(h);
    return this;
  }

  public String getAspectRatio() {
    return aspectRatio;
  }

  public Picture setAspectRatio(double aspectRatio) {
    this.aspectRatio = Double.toString(aspectRatio);
    return this;
  }

  public String getStyle () {
    var sb = new StringBuffer();
    if ( Strings.isNotBlank(aspectRatio) ){
      sb.append("aspect-ratio: ").append(aspectRatio).append(";");
    }
    return sb.toString();
  }
}
