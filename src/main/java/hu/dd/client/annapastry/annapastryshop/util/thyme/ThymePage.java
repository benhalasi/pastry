package hu.dd.client.annapastry.annapastryshop.util.thyme;

import java.nio.file.Path;

public class ThymePage extends ThymeHtml implements ThymeReferable {

  public ThymePage(Path path) {
    super(path);
  }

  public ThymePage() {
  }

  @Override
  public String getThymeReference() {
    return getPath().toString();
  }
  
}
