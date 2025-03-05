package encora.spark.breakable_toy.backend.services;

public interface AuthService {

    String handleCallback(String code);

}
