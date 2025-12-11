package com.example.reservationsystem.repository;

import com.example.reservationsystem.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.room.id = ?1 AND r.startTime < ?3 AND r.endTime > ?2")
    List<Reservation> findOverlappingReservations(Long roomId, LocalDateTime startTime, LocalDateTime endTime);
}
