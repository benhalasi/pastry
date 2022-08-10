package hu.dd.client.annapastry.annapastryshop.error;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import hu.dd.client.annapastry.annapastryshop.demo.Pages;

@Controller
public class AppErrorController implements ErrorController {

	private static final Logger log = LoggerFactory.getLogger(AppErrorController.class);

	@RequestMapping("/error")
	public String handleError(HttpServletRequest request) {
		log.trace("/error");
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
		String originalUri = (String) request.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI);

		if (status != null) {
			Integer statusCode = Integer.valueOf(status.toString());
			log.debug("handling http status {} at {}", status.toString(), originalUri);
			if ( 500 <= statusCode) {
				return Pages.error.getThymeReference();
			} else if ( 400 <= statusCode) {
				return Pages.error.getThymeReference();
			}
		}
		return Pages.error.getThymeReference();
	}
}
