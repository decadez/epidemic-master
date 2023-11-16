package peris.decadez.epidemicbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import peris.decadez.epidemicbackend.service.MessageLeaveService;

@Validated
@RestController
@RequestMapping("/webapi/leaveMessage")
public class MessageLeaveController {
    @Autowired
    MessageLeaveService messageLeaveService;


}
