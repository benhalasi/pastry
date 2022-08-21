package hu.dd.client.annapastry.annapastryshop.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import hu.dd.client.annapastry.annapastryshop.demo.picture.ServicePicture;

@Controller
public class ControllerMain {

  private @Autowired ServicePicture servicePicture; 
  
  @GetMapping({"", "/"})
  public String mainPage (ModelMap model) {
    model.addAttribute("jumbotron", servicePicture.main());
    model.addAttribute("thumbnail", servicePicture.mainThumbnail());
    model.addAttribute("rows", List.of(
      List.of(
        servicePicture.product(4),
        servicePicture.product(5),
        servicePicture.product(6)
      ),
      List.of(
        servicePicture.product(1),
        servicePicture.product(2),
        servicePicture.product(3)
      )
    ));
    return Pages.main.getThymeReference();
  }

  @GetMapping({"/product", "/product/{productId}"})
  public String productPage (ModelMap model) {
    model.addAttribute("pics", List.of(
      servicePicture.product(1),
      servicePicture.product(2),
      servicePicture.product(4),
      servicePicture.product(3),
      servicePicture.product(5),
      servicePicture.product(5),
      servicePicture.product(6),
      servicePicture.product(1)

    ));
    return Pages.product.getThymeReference();
  }

  @GetMapping({"/about"})
  public String aboutPage (ModelMap model) {
    model.addAttribute("p1", servicePicture.about(1));
    model.addAttribute("p2", servicePicture.about(2));
    return Pages.about.getThymeReference();
  }
}
