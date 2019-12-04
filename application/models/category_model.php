<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class category_model extends CI_Model 
{
	public function get_admin_categorys()
{
    $this->db->select('category.*, u.first_name, u.last_name');
    $this->db->from('categorys category');
    $this->db->join('users u', 'u.id=blog.user_id');
    $this->db->order_by('category.id', 'desc');
    $query = $this->db->get();
    return $query->result();
}

public function checkToken($token)
{
    $this->db->where('token', $token);
    $query = $this->db->get('users');

    if($query->num_rows() == 1) {
        return true;
    }
    return false;
}

}