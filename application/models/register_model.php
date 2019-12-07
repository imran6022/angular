<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class register_model extends CI_Model 
{

    function get_all_register(){
        $this->db->select('*');
        $this->db->order_by('id', 'desc');
        $this->db->from('registration');
        return $this->db->get()->result();
    }



}