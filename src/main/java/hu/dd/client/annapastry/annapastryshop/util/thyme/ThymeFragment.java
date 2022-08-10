package hu.dd.client.annapastry.annapastryshop.util.thyme;

import java.nio.file.Path;

public class ThymeFragment implements ThymeReferable {
  
  private Path path;
  private String fragment;

  @Override
  public String getThymeReference() {
    return path.toString() + " :: " + fragment;
  }

  public Path getPath() {
    return path;
  }
  public void setPath(Path path) {
    this.path = path;
  }
  public String getFragment() {
    return fragment;
  }
  public void setFragment(String fragment) {
    this.fragment = fragment;
  }

  
}
