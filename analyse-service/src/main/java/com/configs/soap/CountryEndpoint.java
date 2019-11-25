/*
package com.configs.soap;

import com.entities.Client;
import com.services.ClientSoapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class ClientEndpoint {
    private static final String NAMESPACE_URI = "http://localhost:8081/gs-client-web-service";

    @Autowired
    private ClientSoapRepository clientSoapRepository;



    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getCountryRequest")
    @ResponsePayload
    public Client getClient(@RequestPayload Client request) {
        GetCountryResponse response = new GetCountryResponse();
        response.setCountry(countryRepository.findCountry(request.getName()));

        return response;
    }
}
*/
