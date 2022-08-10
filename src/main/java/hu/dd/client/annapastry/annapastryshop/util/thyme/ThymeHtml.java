package hu.dd.client.annapastry.annapastryshop.util.thyme;

import java.nio.file.Path;

public class ThymeHtml {
  
  private Path path;

  public ThymeHtml() {
  }

  public ThymeHtml(Path path) {
    this.path = path;
  }

  public static ThymePage page (String path) {
    return new ThymePage(Path.of(path));
  }

  public ThymePage page() {
    ThymePage thymePage = new ThymePage();
    thymePage.setPath(path);
    return thymePage;
  }

  public ThymeFragment fragment (String fragment) {
    ThymeFragment thymeFragment = new ThymeFragment();
    thymeFragment.setPath(path);
    thymeFragment.setFragment(fragment);
    return thymeFragment;
  }

  public Path getPath() {
    return path;
  }

  public void setPath(Path path) {
    this.path = path;
  }
}
