package hu.dd.client.annapastry.annapastryshop.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerMain {
  
  @GetMapping({"", "/"})
  public String mainPage () {
    return Pages.main.getThymeReference();
  }

  @GetMapping({"/product", "/product/{productId}"})
  public String productPage () {
    return Pages.product.getThymeReference();
  }

  @GetMapping({"/about"})
  public String aboutPage () {
    return Pages.about.getThymeReference();
  }
}
