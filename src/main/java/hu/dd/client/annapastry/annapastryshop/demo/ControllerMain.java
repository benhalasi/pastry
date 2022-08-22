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
    model.addAttribute("thumbnail", servicePicture.mainThumbnail().setAlt("Pastry promo"));
    model.addAttribute("rows", List.of(
      List.of(
        servicePicture.product(4).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(5184d / 3456),
        servicePicture.product(5).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(5184d / 3456),
        servicePicture.product(6).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(4942d / 3396)
      ),
      List.of(
        servicePicture.product(1).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184),
        servicePicture.product(2).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184),
        servicePicture.product(3).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184)
      )
    ));
    return Pages.main.getThymeReference();
  }

  @GetMapping({"/product", "/product/{productId}"})
  public String productPage (ModelMap model) {
    model.addAttribute("pics", List.of(
      servicePicture.product(1).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184),
      servicePicture.product(2).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184),
      servicePicture.product(4).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(5184d / 3456),
      servicePicture.product(3).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184),
      servicePicture.product(5).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(5184d / 3456),
      servicePicture.product(5).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(5184d / 3456),
      servicePicture.product(6).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(4942d / 3396),
      servicePicture.product(1).setAlt("Specifikus Termék Kép").setTitle("Specifikus Termék Kép").setAspectRatio(3456d / 5184)

    ));
    return Pages.product.getThymeReference();
  }

  @GetMapping({"/about"})
  public String aboutPage (ModelMap model) {
    model.addAttribute("p1", servicePicture.about(1).setAlt("Rólunk kép 1").setTitle("Rólunk kép 1"));
    model.addAttribute("p2", servicePicture.about(2).setAlt("Rólunk kép 2").setTitle("Rólunk kép 2"));
    return Pages.about.getThymeReference();
  }
}
