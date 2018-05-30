package com.living.coding.dojo.labouffe.rest;

import com.living.coding.dojo.labouffe.api.Vote;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@RestController
public class VoteController {

    @GetMapping(value = "/vote", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<Vote> list() {
        return Flux.interval(Duration.ofMillis(500))
                .map(i -> new Vote("augustin"));
    }

}
