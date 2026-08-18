package br.com.orbit.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "system_ping")
public class SystemPing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String message;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    public SystemPing() {}

    public SystemPing(String message) {
        this.message = message;
        this.createdAt = OffsetDateTime.now();
    }

    @PrePersist
    void onPrePersist() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }

    public UUID getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
